export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items: Array<Item> = []) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];

      
      if (item.name === 'Aged Brie') {
        this.updateAgedBrie(item);
      } else if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
        this.updateBackstagePass(item);
      } else if(item.name == "Conjured Mana Cake") {
        this.updateConjuredItem(item);
      }else if (item.name !== 'Sulfuras, Hand of Ragnaros') {
        this.updateRegularItem(item);
      }
    }
    return this.items;
  }

  updateAgedBrie(item: Item) {
    if (item.quality < 50) {
      item.quality++;
    }
    item.sellIn--;
    if (item.sellIn < 0 && item.quality < 50) {
      item.quality++;
    }
    return this.items;
  }

  updateBackstagePass(item: Item) {
      if (item.sellIn < 6) {
        item.quality = Math.min(50, item.quality + 3)
      }
      else if ( item.sellIn > 5 && item.sellIn < 11 ) {
        item.quality = item.quality + 2;
      }
      else if(item.quality < 50) {
          item.quality++; 
      }
      
      
    item.sellIn--;
    if (item.sellIn < 0) {
      item.quality = 0;
    }
  }

  updateRegularItem(item: Item) {
    if (item.sellIn > 0 && item.quality > 0) {
      item.quality--;
    }
    else if (item.sellIn <= 0 && item.quality > 0) {
        item.quality = item.quality -2;
    }
      
    item.sellIn--;
  }

  updateConjuredItem(item : Item){
    item.quality = item.quality - 2;
    item.sellIn--;
  }
}

