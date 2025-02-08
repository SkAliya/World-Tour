import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import HomePage from "./pages/Homepage";
import Login from "./pages/Login";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import AppLayout from "./pages/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";

function App() {
  const [citiesLoading, setCitiesLoading] = useState(false);
  const [cities, setCities] = useState([]);

  useEffect(function () {
    async function FetchCities() {
      try {
        setCitiesLoading(true);

        const res = await fetch("http://localhost:8000/cities");
        const data = await res.json();
        setCities(data);
        // if (!res.ok) throw new Error("Something wrong!");
      } catch (e) {
        // setErrMessg(e.message);
        console.log(e.message);
      } finally {
        setCitiesLoading(false);
      }
    }
    FetchCities();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<HomePade />}></Route> */}
        <Route index element={<HomePage />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="pricing" element={<Pricing />}></Route>
        <Route path="product" element={<Product />}></Route>
        <Route path="app" element={<AppLayout />}>
          <Route
            index
            // element={<CityList cities={cities} citiesLoading={citiesLoading} />}
            element={<Navigate replace to="cities" />}
          ></Route>
          <Route
            path="cities"
            element={<CityList cities={cities} citiesLoading={citiesLoading} />}
          />
          <Route
            path="countries"
            element={
              <CountryList cities={cities} citiesLoading={citiesLoading} />
            }
          />
          <Route path="cities/:id" element={<City cities={cities} />} />
          <Route path=":id" element={<City cities={cities} />} />
          <Route path="form" element={<Form />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
