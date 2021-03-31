import React, {useState, useEffect} from 'react';

import {StackScreenProps} from '@react-navigation/stack';
import {SearchStackParamList} from '../navigation/SearchStackNavigator';
import {SafeAreaView} from 'react-native';
import {Headline, Subheading, ActivityIndicator} from 'react-native-paper';
import axios from 'axios';
import {ALPHA_VANTAGE_API_KEY} from '@env';
import {
  Chart,
  Line,
  Area,
  HorizontalAxis,
  VerticalAxis,
  ChartDataPoint,
  Tooltip,
} from 'react-native-responsive-linechart';

type DetailsScreenProps = StackScreenProps<SearchStackParamList, 'Details'>;

const DetailsScreen = ({route, navigation}: DetailsScreenProps) => {
  const {symbol} = route.params;

  const [financialInstrument, setFinancialInstrument] = useState<any | null>(
    null,
  );
  const [chartData, setChartData] = useState<ChartDataPoint[] | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const response = await axios(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`,
        );
        if (response.data['Error Message']) {
          setFinancialInstrument(null);
          setIsError(true);
        } else {
          setFinancialInstrument(response.data);

          // todo: extract ChartDataPoint parsing logic to a utility function
          const chartData: ChartDataPoint[] = [];
          let xValue = 1;
          for (const [key, value] of Object.entries(
            response.data['Time Series (Daily)'],
          ).reverse()) {
            chartData.push({
              x: xValue,
              y: Number(value['5. adjusted close']),
            });
            xValue++;
          }
          setChartData(chartData);
        }
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {isLoading && (
        <ActivityIndicator
          animating={true}
          size="large"
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}
        />
      )}
      {financialInstrument && chartData && (
        <>
          <Headline>{symbol}</Headline>
          <Subheading>
            {financialInstrument['Meta Data']['1. Information']}
          </Subheading>
          <Subheading>
            Last Refreshed:{' '}
            {financialInstrument['Meta Data']['3. Last Refreshed']}
          </Subheading>

          <Chart
            data={chartData}
            style={{height: 200, width: 400}}
            padding={{left: 40, bottom: 20, right: 20, top: 20}}
            xDomain={{
              min: Math.min(
                ...chartData.map(chartDataPoint => chartDataPoint.x),
              ),
              // See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max
              max: Math.max(
                ...chartData.map(chartDataPoint => chartDataPoint.x),
              ),
            }}
            yDomain={{
              min: Math.min(
                ...chartData.map(chartDataPoint => chartDataPoint.y),
              ),
              max: Math.max(
                ...chartData.map(chartDataPoint => chartDataPoint.y),
              ),
            }}>
            <VerticalAxis
              tickCount={5}
              theme={{labels: {formatter: v => v.toFixed(0)}}}
            />
            <HorizontalAxis />
            <Area
              theme={{
                gradient: {
                  from: {color: '#6200ee'},
                  to: {color: '#03dac4', opacity: 0.4},
                },
              }}
            />
            <Line
              tooltipComponent={
                <Tooltip theme={{formatter: ({y}) => y.toFixed(0)}} />
              }
              smoothing="cubic-spline"
              theme={{
                stroke: {color: '#6200ee'},
                scatter: {default: {width: 4, height: 4, rx: 2}},
              }}
            />
          </Chart>
        </>
      )}
    </SafeAreaView>
  );
};

export default DetailsScreen;
