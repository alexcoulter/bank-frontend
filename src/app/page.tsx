'use client'
import Image from "next/image";
import { useGlobalContext } from "./AppContext";
import Spinner from "./components/Spinner";
import { SetStateAction, useState } from "react";
import { Account } from "./types";

export default function Home() {
  const { customer, bankAccounts, creditAccounts, allAccounts, transactions, setTransactions } = useGlobalContext();
  const [currentAccount, setCurrentAccount] = useState<string>();

  function handleSelectChange(e: { target: { value: SetStateAction<string | undefined>; }; } | undefined) {
    setCurrentAccount(e!.target.value);
    const ourAccount  = customer?.accounts.filter((account)=> account.accountName== e?.target.value)[0];
    setTransactions(ourAccount?.transactions);
  }


  if(customer)
return ( 
    <main className=" min-h-screen items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono">
        <h1><b>Coulter Bank</b></h1>
        <p>Welcome {customer.name}!</p>
        <div className=" w-full justify-center border-b border-gray-300 bg-gradient-to-b  pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-50 lg:p-4 lg:dark:bg-zinc-800/30 my-3">
        <p>Bank accounts</p>
        <hr/>
        
        {bankAccounts.map((account, index)=> (
          <div  key={index}>
          <p className="text-blue-700">{account.accountName} &gt;</p>
          <table className="">
            <thead>
              <tr>
              <th>Available balance</th>
              <th>Deposits this month</th>
              <th>Withdrawals this month</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{account.balance}</td>
                <td>?</td>
                <td>?</td>
              </tr>
            </tbody>
          </table>
          {/* <p>Available balance  |  deposits this month | Withdrawals this month</p>
          <p>{account.balance}</p> */}
          </div>
        ))}
        
        </div>
        <div className=" w-full justify-center border-b border-gray-300 bg-gradient-to-b  pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-50 lg:p-4 lg:dark:bg-zinc-800/30 my-3">
          <p>Credit cards</p>
          <hr />
          {creditAccounts.map((account, index)=> (
          <div  key={index}>
          <p className="text-blue-700">{account.accountName} &gt;</p>
          <table className="">
            <thead>
              <tr>
              <th>Remaining statement balance</th>
              <th>Available credit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${10000 -account.balance}</td>
                <td>${account.balance}</td>
              </tr>
            </tbody>
          </table>
          {/* <p>Remaining statement balance  | Available credit</p>
          <p>{10000 -account.balance}    10000</p> */}
          </div>
        ))}
          {/* <p className="text-blue-700">Expandable account name &gt;</p>
          <p> Remaining statement balance  | Available credit</p> */}
        </div>
        <div className=" w-full justify-center border-b border-gray-300 bg-gradient-to-b  pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-50 lg:p-4 lg:dark:bg-zinc-800/30 my-3">
          <p>See all Transactions</p>
          <hr />
          <select value={currentAccount} onChange={(e)=> handleSelectChange(e)}>
            {allAccounts.map((account, index)=> (
               <option key={index} value={account.accountName}>{account.accountName}</option>
            ))}
          </select>
          <table>
            <thead>
              <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Description</th>
              </tr>
            </thead>
            <tbody>
            
          {!!transactions.length && transactions.map((transaction, index)=> (
              <tr key={index}>
                <td>{new Date(transaction.transactionTime).toLocaleDateString()}</td>
                <td>${transaction.amount}</td>
                <td>{transaction.transactionType}</td>
              </tr>
          ))}
            </tbody>
            </table>
             {transactions.length == 0 && <p>No transactions to show</p>}
        </div>
  
      </div>
    </main>
  );

  else {
    return (
    <Spinner />
    )
  }
}
