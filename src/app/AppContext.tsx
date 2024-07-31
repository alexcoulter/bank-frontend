'use client'
// AppContext.tsx
import React, { useEffect, useState, createContext, useContext, ReactNode, FC } from "react";
import { AppContextType, Customer, Account, Transaction } from "./types";

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider: FC<AppProviderProps> = ({ children }) => {

  const [customer, setCustomer] = useState<Customer>();
  const [creditAccounts, setCreditAccounts] = useState<Account[]>([]);
  const [bankAccounts, setBankAccounts] = useState<Account[]>([]);
  const [allAccounts, setAllAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    async function fetchData() {
      let headers = new Headers();
      headers.append('Access-Control-Allow-Origin', '*');
      const customerResponse = await fetch('http://localhost:8080/api/customers/6');
      const customer = await customerResponse.json();
      console.log("***" + JSON.stringify(customer));
      const firstAccountId = customer.accounts[0].accountId;

      setCustomer(customer);
      setAllAccounts(customer.accounts);
      const creditAccounts = customer.accounts.filter((account: Account)=> (account.accountType.toLowerCase() == "credit"));
      setCreditAccounts(creditAccounts);

      const bankAccounts = customer.accounts.filter((account: Account)=> (account.accountType.toLowerCase() !== "credit"));
      setBankAccounts(bankAccounts);
 
      const transactionUrl = 'http://localhost:8080/api/transactions/' + firstAccountId;
      const transactionsResponse = await fetch(transactionUrl);
      const transactions = await transactionsResponse.json();
      console.log("AAAA" + JSON.stringify(transactions));
      setTransactions(transactions);
    }

    fetchData();
  }, []);

  return (
    <AppContext.Provider value={{
      customer,
      allAccounts,
      bankAccounts,
      creditAccounts,
      transactions,
      setTransactions
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