import { Account } from './account';
import { Category } from './category';

export class Operation {
  id: number;
  name: string;
  account_id: number;
  category_id: number;
  amount: number;
  checked: boolean;
  date: number;
  account: Account;
  category: Category;
}
