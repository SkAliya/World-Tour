import { useCallback, useContext, useEffect, useReducer } from "react";
import { createContext } from "react";

const CitiesContext = createContext();
const Base_URL = "http://localhost:8000";
const initialState = {
  isLoading: false,
  cities: [],
  currentCity: {},
  errMessage: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, cities: action.payload, isLoading: false };
    case "city/loaded":
      return { ...state, currentCity: action.payload, isLoading: false };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case "rejected":
      return { ...state, errMessage: action.payload, isLoading: false };
    default:
      throw new Error("Unkown action!");
  }
}

function CitiesProvider({ children }) {
  const [{ isLoading, cities, currentCity, errMessage }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function FetchCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${Base_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "Something went wrong in cities loading!",
        });
      }
    }
    FetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return;
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${Base_URL}/cities/${id}`);
        const data = await res.json();
        dispatch({ type: "city/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "Something went wrong in city loading!",
        });
      }
    },
    [currentCity.id]
  );

  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${Base_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "content-type": "application/json" },
      });
      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "Something went wrong in city creating!",
      });
    }
  }
  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${Base_URL}/cities/${id}`, {
        method: "Delete",
      });

      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "Something went wrong in city deleting!",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        isLoading,
        cities,
        currentCity,
        errMessage,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCitiesContext() {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error("CitiesContext used outside the provider!");
  }
  return context;
}

export { CitiesProvider, useCitiesContext };
