import { Item } from './items/entity'
import { ItemGroup } from './groups/entity'
import { Prices } from './prices/entity'
import { PriceType } from './price-types/entity'
import { ItemPictures } from './item_pictures/entity'

const entities = [
  Item,
  ItemPictures,
  ItemGroup,
  Prices,
  PriceType,
]

export {
  entities,
  Item,
  ItemPictures,
  Prices,
  PriceType,
  ItemGroup
}