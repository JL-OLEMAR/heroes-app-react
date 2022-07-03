import { heroes } from '../data/heroes'

export function getHeroById(id) {
  return heroes.find((hero) => hero.id === id)
}
