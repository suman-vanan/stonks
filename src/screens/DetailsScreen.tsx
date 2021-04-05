import React, {useState, useEffect} from 'react';

import {StackScreenProps} from '@react-navigation/stack';
import {SearchStackParamList} from '../navigation/SearchStackNavigator';
import {SafeAreaView, StyleSheet} from 'react-native';
import {
  Headline,
  Subheading,
  Caption,
  ActivityIndicator,
  DataTable,
} from 'react-native-paper';
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

  const [timeSeriesDailyAdjusted, setTimeSeriesDailyAdjusted] = useState<
    any | null
  >(null);
  const [quote, setQuote] = useState<any | null>(null);
  const [chartData, setChartData] = useState<ChartDataPoint[] | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      const getTimeSeriesDailyAdjusted = () => {
        return axios.get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`,
        );
      };

      const getQuote = () => {
        return axios.get(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`,
        );
      };

      try {
        const responseList = await Promise.all([
          getTimeSeriesDailyAdjusted(),
          getQuote(),
        ]);

        if (
          responseList[0].data['Error Message'] ||
          responseList[0].data['Note'] ||
          responseList[1].data['Error Message'] ||
          responseList[1].data['Note']
        ) {
          // @ts-expect-error
          alert('Error Response from Alpha Vantage API');
          setTimeSeriesDailyAdjusted(null);
          setQuote(null);
          setIsError(true);
        } else {
          setTimeSeriesDailyAdjusted(responseList[0].data);
          setQuote(responseList[1].data);

          // todo: extract ChartDataPoint parsing logic to a utility function
          const chartData: ChartDataPoint[] = [];
          let xValue = 1;
          for (const [key, value] of Object.entries(
            responseList[0].data['Time Series (Daily)'],
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
        // @ts-expect-error
        alert(error);
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && (
        <ActivityIndicator
          animating={true}
          size="large"
          style={{
            flex: 1,
          }}
        />
      )}
      {isError && (
        <Headline
          style={{
            flex: 1,
          }}>
          Oops, an error has occurred
        </Headline>
      )}
      {timeSeriesDailyAdjusted && quote && chartData && (
        <>
          <Headline>{symbol}</Headline>
          <Subheading>
            {timeSeriesDailyAdjusted['Meta Data']['1. Information']}
          </Subheading>
          <Caption>
            Last Refreshed:{' '}
            {timeSeriesDailyAdjusted['Meta Data']['3. Last Refreshed']}
          </Caption>

          <DataTable>
            <DataTable.Header>
              <DataTable.Title numeric>Open</DataTable.Title>
              <DataTable.Title numeric>High</DataTable.Title>
              <DataTable.Title numeric>Low</DataTable.Title>
              <DataTable.Title numeric>Price</DataTable.Title>
              <DataTable.Title numeric>Change (%)</DataTable.Title>
            </DataTable.Header>

            <DataTable.Row>
              <DataTable.Cell numeric>
                {Number(quote['Global Quote']['02. open']).toFixed(2)}
              </DataTable.Cell>
              <DataTable.Cell numeric>
                {Number(quote['Global Quote']['03. high']).toFixed(2)}
              </DataTable.Cell>
              <DataTable.Cell numeric>
                {Number(quote['Global Quote']['04. low']).toFixed(2)}
              </DataTable.Cell>
              <DataTable.Cell numeric>
                {Number(quote['Global Quote']['05. price']).toFixed(2)}
              </DataTable.Cell>
              <DataTable.Cell numeric>
                {quote['Global Quote']['10. change percent']}
              </DataTable.Cell>
            </DataTable.Row>
          </DataTable>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DetailsScreen;
