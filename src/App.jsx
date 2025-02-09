import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import { CitiesProvider } from "./contexts/CitiesContext";

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
  return (
    <CitiesProvider>
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
            <Route path="cities" element={<CityList />} />
            <Route path="countries" element={<CountryList />} />
            <Route path="cities/:id" element={<City />} />
            <Route path=":id" element={<City />} />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </CitiesProvider>
  );
}

export default App;
