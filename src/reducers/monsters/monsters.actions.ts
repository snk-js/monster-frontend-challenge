import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Battle, Monster } from '../../models/interfaces/monster.interface';
import { MonsterService } from './monsters.service';

export const fetchMonstersData = createAsyncThunk<Monster[]>(
  'monsters/fetchMonstersData',
  MonsterService.getAll,
);

export const setSelectedMonster = createAction<Monster | null>(
  'monsters/setSelectedMonster',
);

export const fight = createAsyncThunk<Battle, { id1: string; id2: string }>(
  'monsters/fight',
  MonsterService.fight,
);
