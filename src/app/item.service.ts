import { Inject, Injectable, EventEmitter } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Item } from './interfaces/item';
const ITEM_KEY = 'local_item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  public item: Item | any = null;

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }

  init() {
    this.item = this.storage.get(ITEM_KEY) || null;
  }

  setItem(item: any): void {
    this.item = item;
    this.storage.set(ITEM_KEY, item);
  }

  getItem(): Item | any  {
    return this.item
  }

  clearItem() {
    this.item = null;
    this.storage.set(ITEM_KEY, this.item);
  }
}
