import { API_URL } from '../../constants/env';
import { Battle, Monster } from '../../models/interfaces/monster.interface';

const getAll = async (): Promise<Monster[]> =>
  await fetch(`${API_URL}/monsters`).then((response) => response.json());

const fight = async ({
  id1,
  id2,
}: {
  id1: string;
  id2: string;
}): Promise<Battle> =>
  await fetch(`${API_URL}/battle`, {
    method: 'POST',
    body: JSON.stringify({
      monster1Id: id1,
      monster2Id: id2,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json());

export const MonsterService = {
  getAll,
  fight,
};
