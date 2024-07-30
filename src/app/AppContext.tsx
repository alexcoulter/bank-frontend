'use client'
// AppContext.tsx
import React, { useEffect, useState, createContext, useContext, ReactNode, FC } from "react";
import { AppContextType, Player, Team, Schedule, Customer, Account, Transaction } from "./types";

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider: FC<AppProviderProps> = ({ children }) => {

  const [customer, setCustomer] = useState<Customer>();
  const [creditAccounts, setCreditAccounts] = useState<Account[]>([]);
  const [bankAccounts, setBankAccounts] = useState<Account[]>([]);

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    async function fetchData() {
      let headers = new Headers();
      headers.append('Access-Control-Allow-Origin', '*');
      const customerResponse = await fetch('http://localhost:8080/api/customers/6');
      const customer = await customerResponse.json();
      console.log("***" + JSON.stringify(customer));
      console.log("%%%" + JSON.stringify(customer.name));
      setCustomer(customer);
      const creditAccounts = customer.accounts.filter((account: Account)=> (account.accountType.toLowerCase() == "credit"));
      console.log("$$$" + JSON.stringify(creditAccounts));
      setCreditAccounts(creditAccounts);

      const bankAccounts = customer.accounts.filter((account: Account)=> (account.accountType.toLowerCase() !== "credit"));
      setBankAccounts(bankAccounts);
      // setLeague(customer.name);

      // const accountsResponse = await fetch("http://localhost:8080/api/accounts/6");
      // const accounts = await accountsResponse.json();
      // setSchedule(accounts);

      const transactionsResponse = await fetch('http://localhost:8080/api/transactions/11');
      const transactions = await transactionsResponse.json();
      setTransactions(transactions);
    }

    fetchData();
  }, []);

  return (
    <AppContext.Provider value={{
      customer,
       bankAccounts,
       creditAccounts,
      transactions
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within an AppProvider");
  }
  return context;
};

export { AppContext, AppProvider };