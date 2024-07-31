export interface Player {
  // Define the structure of your player object
  id: number;
  firstName: string;
  lastName: string;
  // Add other fields as necessary
}

export interface Team {
  // Define the structure of your team object
  id: number;
  name: string;
  // Add other fields as necessary
}

export interface Customer {
  customerId: number;
  name: string;
  email: string;
  accountTypes: string;
  accounts: Account[];
}

export interface Account {
  accountId: number;
  accountType: string;
  accountName: string;
  balance: number;
  transactions: Transaction[];
}

export interface Transaction {
  transactionId: number;
  transactionType: string;
  transactionTime: Date;
  amount: number;
}

export interface Schedule {
  // Define the structure of your schedule object
  id: number;
  matchDate: string;
  // Add other fields as necessary
}

export interface AppContextType {
  customer: Customer | undefined;
  allAccounts: Account[];
  bankAccounts: Account[];
  creditAccounts: Account[];
  transactions: Transaction[];
  setTransactions: any;
}