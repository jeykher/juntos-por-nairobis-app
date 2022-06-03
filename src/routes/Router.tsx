import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "layouts/MainLayout/MainLayout";

import HomePage from "views/HomePage/HomePage";
import AdminPage from "views/AdminPage/AdminPage";
import AddTicketPage from "views/AddTicketPage/AddTicketPage";
import LotteryShowPage from "views/LotteryShowPage/LotteryShowPage";
import WinnerPage from "views/WinnerPage/WinnerPage";
import ErrorPage from "views/ErrorPage/ErrorPage";

const Router = () => {
     return (
         <>
             <BrowserRouter>
                 <Routes>
                     <Route
                         path="/"
                         element={
                            <HomePage />
                         }
                     />
                     <Route
                         path="/home"
                         element={
                            <HomePage />
                         }
                     />
                     <Route
                         path="/admin"
                         element={
                            <AdminPage />
                         }
                     />
                     <Route 
                        path="/ticket/add/:ticketNumber/:id"
                        element={
                            <MainLayout>
                                <AddTicketPage />
                            </MainLayout>
                        }
                    />
                    <Route 
                        path="/event"
                        element={
                            <MainLayout>
                                <LotteryShowPage />
                            </MainLayout>
                        }
                    />
                    <Route 
                        path="/winner"
                        element={
                            <MainLayout>
                                <WinnerPage />
                            </MainLayout>
                        }
                    />
                     <Route
                         path="/*"
                         element={
                             <ErrorPage />
                         }
                     />
                 </Routes>
             </BrowserRouter>
         </>
     )
};

export default Router;
