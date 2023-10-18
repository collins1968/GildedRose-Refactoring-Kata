import { Item, GildedRose } from '@/gilded-rose';

// describe('Gilded Rose', () => {
//   it('should foo', () => {
//     const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
//     const items = gildedRose.updateQuality();
//     expect(items[0].name).toBe('fixme');
//   });
// });
describe('Gilded Rose', () => {
  it('should decrease quality twice as fast for regular items after the sell by date', () => {
    const gildedRose = new GildedRose([new Item('Regular Item', 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('Regular Item');
    expect(items[0].sellIn).toBe(-1); // SellIn decreased by 1
    expect(items[0].quality).toBe(8); // Quality decreased by 2
  });

  it('should not allow the quality of an item to be negative', () => {
    const gildedRose = new GildedRose([new Item('Regular Item', 5, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0); // Quality should not go below 0
  });

  it('should increase the quality for Aged Brie as it ages', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 5, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('Aged Brie');
    expect(items[0].sellIn).toBe(4); // SellIn decreased by 1
    expect(items[0].quality).toBe(11); // Quality increased by 1
  });

  it('should not allow the quality of an item to exceed 50', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 5, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50); // Quality should not exceed 50
  });

  it('should not change the quality or sellIn value for Sulfuras', () => {
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 0, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('Sulfuras, Hand of Ragnaros');
    expect(items[0].sellIn).toBe(0); // SellIn should remain the same
    expect(items[0].quality).toBe(80); // Quality should remain the same
  });

  it('should increase quality for Backstage Passes as SellIn value approaches', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 11, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('Backstage passes to a TAFKAL80ETC concert');
    expect(items[0].sellIn).toBe(10); // SellIn decreased by 1
    expect(items[0].quality).toBe(11); // Quality increased by 1
  });

  it('should increase quality by 2 for Backstage Passes when there are 10 days or less', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(12); // Quality increased by 2
  });

  it('should increase quality by 3 for Backstage Passes when there are 5 days or less', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(13); // Quality increased by 3
  });

  it('should set quality to 0 for Backstage Passes after the concert', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0); // Quality should be set to 0
  });
});


