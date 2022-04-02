import {User} from '../../entities/user'
import { DeleteResult, UpdateResult } from 'typeorm'

interface InterfaceUser {
    uuid: string;
    name: string;
    email: string;
    password: string;
    isAdm: boolean;
    createdOn: Date;
    updatedOn: Date;
  }
  
  interface CreateUser {
    name: string;
    email: string;
    password: string;
    isAdm: boolean;
  }
  
  interface InterfaceUserRepository {
    postUsers: (user: CreateUser) => InterfaceUser;
    saveUsers: (user: InterfaceUser) => Promise<InterfaceUser>;
    findUser: (key: string, value: string) => Promise<InterfaceUser>;
    findUsers: () => Promise<InterfaceUser[]>;
    editUser: (
      uuid: string,
      update: { [x: string]: unknown }
    ) => Promise<UpdateResult>;
    deleteUser: (uuid: string) => Promise<DeleteResult>;
  }
  
  export { InterfaceUser, CreateUser, InterfaceUserRepository };