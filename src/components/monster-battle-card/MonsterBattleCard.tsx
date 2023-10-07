import { Divider } from '@mui/material';
import { Monster } from '../../models/interfaces/monster.interface';
import { WinnerDisplay } from '../winner-display/WinnerDisplay';
import {
  BattleMonsterCard,
  BattleMonsterTitle,
  ProgressBar,
} from './MonsterBattleCard.styled';

type MonsterCardProps = {
  monster: Monster;
};

const MonsterBattleCard: React.FC<MonsterCardProps> = ({ monster }) => {
  const { id, hp, attack, defense, speed, name, imageUrl } = monster;

  const stats = ['HP', 'Attack', 'Defense', 'Speed'];

  const attributes = [hp, attack, defense, speed].map((stat, i) => {
    return {
      label: stats[i],
      value: stat,
    };
  });

  return (
    <BattleMonsterCard>
      <img
        src={imageUrl}
        alt="monster"
        style={{
          marginBottom: '1rem',
          borderRadius: '0.4375rem',
          background: 'url(<path-to-image>), lightgray 50% / cover no-repeat',
          boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.25)',
        }}
      />

      <BattleMonsterTitle>{name!}</BattleMonsterTitle>
      <Divider style={{ marginBottom: '1rem' }} />
      {attributes.map((attr) => {
        return (
          <div
            style={{
              marginBottom: '0.5rem',
            }}>
            <span>{attr.label}</span>
            <ProgressBar
              variant="buffer"
              valueBuffer={attr.value}
              value={attr.value}
            />
          </div>
        );
      })}
    </BattleMonsterCard>
  );
};

export { MonsterBattleCard };
