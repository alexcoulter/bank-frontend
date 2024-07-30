'use client'
import Image from "next/image";
import { useGlobalContext } from "./AppContext";
import Spinner from "./components/Spinner";

export default function Home() {
  const { customer, bankAccounts, creditAccounts, transactions } = useGlobalContext();
  console.log("1234" + JSON.stringify(creditAccounts));
  console.log("1111" + JSON.stringify(bankAccounts));


  if(customer) return (
    
    <main className=" min-h-screen items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono">
        <h1><b>Coulter Bank</b></h1>
        <p>Welcome {customer.name}!</p>
        <div className=" w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30 my-3">
        <p>Bank accounts</p>
        <hr/>
        {bankAccounts.map((account, index)=> (
          <div  key={index}>
          <p className="text-blue-700">{account.accountName} &gt;</p>
          <p>Available balance  |  deposits this month | Withdrawals this month</p>
          <p>{account.balance}</p>
          </div>
        ))}
        
        </div>
        <div className=" w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30 my-3">
          <p>Credit cards</p>
          <hr />
          {creditAccounts.map((account, index)=> (
          <div  key={index}>
          <p className="text-blue-700">{account.accountName} &gt;</p>
          <p>Remaining statement balance  | Available credit</p>
          <p>{account.balance}    10000</p>
          </div>
        ))}
          {/* <p className="text-blue-700">Expandable account name &gt;</p>
          <p> Remaining statement balance  | Available credit</p> */}
        </div>
        <div className=" w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30 my-3">
          <p>See all Transactions</p>
          <hr />
          <p>{customer.accounts[0].accountName}</p>
          <p> Date           | Amount | Description</p>
          {transactions.map((transaction, index)=> (
            <div key={index}>
              <p>{new Date(transaction.transactionTime).toLocaleDateString()}-{new Date(transaction.transactionTime).toLocaleTimeString()} | {transaction.amount}</p>
            </div>
          ))}
          {/* <p> Accounts with select box showing accounts</p>
          <p> Table with Date, Description, Amount</p>
          <p> First 5 transactions and blue link on right `See all transactions`</p> */}
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
