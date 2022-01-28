import { User } from './../users/user.model';
import { Customer } from './../customers/customer.model';
import { Status } from './status.model';
import { Institute } from "../institutes/institute.model";

export interface Proposal {
  id: number;
  contract_type: string;
  reproval_description: string;
  final_value: number;
  fee: number;
  comission_value: number;
  comission_percentage: number;
  contract_status: number;
  user: User;
  institute: Institute;
  status: Status;
  customer: Customer;
  created_at: string;
  updated_at: string;
  contract_upload?: string;
}
