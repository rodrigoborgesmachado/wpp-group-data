import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export function BasicBars({nomes, dados}) {
  return (
    <div className='grafico'>
      <BarChart
        xAxis={[{ scaleType: 'band', data: nomes }]}
        series={[{data: dados}]}
        width={1000}
        height={700}
      />
    </div>
  );
}

export function GayBasicBars({dados}) {
  return (
    <div className='grafico'>
      <BarChart
        series={dados}
        colors={[
          '#E40303',
          '#FF8C00',
          '#FFED00',
          '#008026',
          '#24408E',
          '#732982'
        ]}
        width={1000}
        height={700}
      />
    </div>
  );
}