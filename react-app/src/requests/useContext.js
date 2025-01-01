import React from "react";

export const CustomerContext = React.createContext();
export const TripsContext = React.createContext();

export const Customer_Details = ({childeren}) => {
    const [details, setDetails] = React.useState();
    const [login, setlogin] = React.useState(false);
    const [token, setToken] = React.useState();

    const [main_data, setMain_Data] = React.useState(undefined);
    const [price, setPrice] = React.useState('0.000');
    const [trip, setTrip] = React.useState(false);
    const [driver, SetDriver] = React.useState();

    return (
        <CustomerContext.Provider value = {{details, setDetails, login, setlogin, token, setToken}}>
            <TripsContext.Provider value={{main_data, setMain_Data, price, setPrice, trip, setTrip, driver, SetDriver}}>
                {childeren}
            </TripsContext.Provider>
        </CustomerContext.Provider>
    )
}