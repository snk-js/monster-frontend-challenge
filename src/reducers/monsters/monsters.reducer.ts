import { createReducer } from '@reduxjs/toolkit';
import { Monster } from '../../models/interfaces/monster.interface';
import {
  fetchMonstersData,
  setSelectedMonster,
  fight,
} from './monsters.actions';

interface MonsterState {
  monsters: Monster[];
  selectedMonster: Monster;
  winner: Monster | null;
}

export const dummyMonster = {
  id: '',
  name: '',
  attack: 0,
  defense: 0,
  hp: 0,
  speed: 0,
  type: '',
  imageUrl: '',
};

const initialState: MonsterState = {
  monsters: [],
  selectedMonster: dummyMonster,
  winner: dummyMonster,
};

export const monstersReducer = createReducer(initialState, (builder) => {
  builder.addCase(fetchMonstersData.pending, (state) => ({
    ...state,
    monsters: [],
  }));

  builder.addCase(fetchMonstersData.rejected, (state) => ({
    ...state,
    monsters: [],
  }));

  builder.addCase(fetchMonstersData.fulfilled, (state, action) => ({
    ...state,
    monsters: action.payload,
  }));

  builder.addCase(fight.fulfilled, (state, action) => {
    const winner = action.payload;

    return {
      ...state,
      winner: winner.tie ? null : winner.winner,
    };
  });

  builder.addCase(setSelectedMonster, (state, action) => ({
    ...state,
    selectedMonster: action.payload || dummyMonster,
  }));
});
