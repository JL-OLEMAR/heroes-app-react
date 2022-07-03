import { heroes } from '../data/heroes'

export function getHeroesByPublisher(publisher) {
  const validPublishers = ['DC Comics', 'Marvel Comics']

  if (!validPublishers.includes(publisher)) {
    throw new Error(`${publisher} is not a valid publisher`)
  }

  return heroes.filter((hero) => hero.publisher === publisher)
}
