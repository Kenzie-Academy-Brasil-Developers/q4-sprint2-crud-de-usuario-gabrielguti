import { getRepository, Repository } from "typeorm";
import { User } from "../../entities/user";
import {
  InterfaceUser,
  CreateUser,
  InterfaceUserRepository,
} from "./interface";

class UserRepository implements InterfaceUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  postUsers = (user: CreateUser) => this.ormRepository.create(user);
  saveUsers = async (user: InterfaceUser) => this.ormRepository.save(user);
  findUser = async (key: string, value: string) =>
    await this.ormRepository.findOne({ [key]: value });
  findUsers = async () => this.ormRepository.find();
  editUser = async (uuid: string, update: { [x: string]: unknown }) =>
    await this.ormRepository.update(uuid, update);
  deleteUser = async (uuid: string) =>
    await this.ormRepository.delete({ uuid });
}

export {UserRepository, InterfaceUser}