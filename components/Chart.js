import * as React from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const Chart = ({ data, height = 250 }) => {
  return (
    <LineChart
      data={data}
      width={Dimensions.get('window').width - 30}
      height={height}
      yAxisInterval={10}
      horizontalLabelRotation={0}
      withVerticalLabels={false}
      withHorizontalLabels={true}
      withShadow={true}
      withDots={false}
      withInnerLines={true}
      withOuterLines={true}
      fromZero={false}
      chartConfig={{
        backgroundColor: '#fff',
        backgroundGradientFrom: '#fff',
        backgroundGradientTo: '#fff',
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 2,
        useShadowColorFromDataset: true,
      }}
      bezier
    />
  );
};

export default Chart;
