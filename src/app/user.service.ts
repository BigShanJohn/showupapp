import { Inject, Injectable, EventEmitter } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Subject } from 'rxjs';
import { User } from './interfaces/user';

const USERS_KEY = 'local_user';


@Injectable({
  providedIn: 'root'
})

export class UserService {

  public user: User | null = null;
  userChange: Subject<any> = new Subject<any>();

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }

  init() {
    this.user = this.storage.get(USERS_KEY) || null;
  }

  setUser(user: User): void {
    this.user = user;
    this.userChange.next(this.user);
    this.storage.set(USERS_KEY, user);
  }

  getUser(): User | null {
    return this.user
  }

  clearUser() {
    this.user = null;
    this.storage.set(USERS_KEY, this.user);
  }
}
