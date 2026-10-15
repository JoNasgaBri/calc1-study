import type { Exercise } from '../../data/types';
import { ExerciseCard } from './ExerciseCard';

export function ExerciseList({ exercises }: { exercises: Exercise[] }) {
  return (
    <div className="space-y-4">
      {exercises.map((e) => (
        <ExerciseCard key={e.id} exercise={e} />
      ))}
    </div>
  );
}
