import { Account } from './account';
import { Category } from './category';

export class Operation {
  id: number;
  name: string;
  accountId: number;
  categoryId: number;
  amount: number;
  checked: boolean;
  date: string;
  account: Account;
  category: Category;
}
