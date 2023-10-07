import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../app/hooks';
import { MonsterBattleCard } from '../../components/monster-battle-card/MonsterBattleCard';
import { MonstersList } from '../../components/monsters-list/MonstersList';
import { Title } from '../../components/title/Title';
import {
  fetchMonstersData,
  fight,
} from '../../reducers/monsters/monsters.actions';
import {
  selectMonsters,
  selectSelectedMonster,
  winnerSelect,
} from '../../reducers/monsters/monsters.selectors';
import {
  BattleSection,
  PageContainer,
  StartBattleButton,
} from './BattleOfMonsters.styled';
import { Monster } from '../../models/interfaces/monster.interface';
import { dummyMonster } from '../../reducers/monsters/monsters.reducer';
import { WinnerDisplay } from '../../components/winner-display/WinnerDisplay';

const getRandomizedMonster = (monsters: Monster[], exclude: string) => {
  const filteredMonsters = monsters.filter((m) => m.id !== exclude);
  if (!filteredMonsters) return null;
  const randomizedIndex = Math.floor(Math.random() * monsters.length);
  return filteredMonsters[randomizedIndex];
};

const BattleOfMonsters = () => {
  const dispatch = useAppDispatch();

  const monsters = useSelector(selectMonsters);
  const playerMonster = useSelector(selectSelectedMonster);

  const winner = useSelector(winnerSelect);

  const [computerMonster, setComputerMonster] = useState<Monster | undefined>(
    undefined,
  );

  useEffect(() => {
    setComputerMonster(dummyMonster);
    const computer = getRandomizedMonster(monsters, playerMonster?.id);
    computer && setComputerMonster(computer);
  }, [playerMonster]);

  useEffect(() => {
    dispatch(fetchMonstersData());
  }, []);

  const handleStartBattleClick = () => {
    computerMonster &&
      dispatch(fight({ id1: playerMonster.id, id2: computerMonster.id }));
  };

  return (
    <PageContainer>
      <Title>Battle of Monsters</Title>

      <MonstersList monsters={monsters} />

      {(winner?.name && <WinnerDisplay text={winner.name} />) || <></>}

      <BattleSection>
        <MonsterBattleCard monster={playerMonster}></MonsterBattleCard>
        <StartBattleButton
          data-testid="start-battle-button"
          disabled={!playerMonster.id}
          onClick={handleStartBattleClick}>
          Start Battle
        </StartBattleButton>
        <MonsterBattleCard
          monster={computerMonster || dummyMonster}></MonsterBattleCard>
      </BattleSection>
    </PageContainer>
  );
};

export { BattleOfMonsters };
