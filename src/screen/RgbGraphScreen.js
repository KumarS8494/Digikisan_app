import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useBluetooth } from '../../src/BluetoothContext';

const { width } = Dimensions.get('window');

const RgbGraphScreen = () => {
  const { rgbData } = useBluetooth();
  const [rValues, setRValues] = useState([]);
  const [gValues, setGValues] = useState([]);
  const [bValues, setBValues] = useState([]);

  useEffect(() => {
    if (rgbData) {
      // Extract R, G, B values from the string
      const values = rgbData.split(' ').filter((item, index) => index % 2 !== 0); // Extract only the numbers
      const r = parseInt(values[0], 10);
      const g = parseInt(values[1], 10);
      const b = parseInt(values[2], 10);

      // Update the state with the new values
      setRValues(prev => [...prev, r].slice(-20)); // Keep last 20 values
      setGValues(prev => [...prev, g].slice(-20)); // Keep last 20 values
      setBValues(prev => [...prev, b].slice(-20)); // Keep last 20 values
    }
  }, [rgbData]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>RGB Values Over Time</Text>
      <View style={styles.graphContainer}>
        <Text style={styles.graphTitle}>R Values</Text>
        <LineChart
          data={{
            labels: Array(rValues.length).fill(''),
            datasets: [{ data: rValues }],
          }}
          width={width - 40}
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          chartConfig={chartConfig}
          bezier
          style={styles.graph}
        />
      </View>
      <View style={styles.graphContainer}>
        <Text style={styles.graphTitle}>G Values</Text>
        <LineChart
          data={{
            labels: Array(gValues.length).fill(''),
            datasets: [{ data: gValues }],
          }}
          width={width - 40}
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          chartConfig={chartConfig}
          bezier
          style={styles.graph}
        />
      </View>
      <View style={styles.graphContainer}>
        <Text style={styles.graphTitle}>B Values</Text>
        <LineChart
          data={{
            labels: Array(bValues.length).fill(''),
            datasets: [{ data: bValues }],
          }}
          width={width - 40}
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          chartConfig={chartConfig}
          bezier
          style={styles.graph}
        />
      </View>
    </View>
  );
};

const chartConfig = {
  backgroundColor: '#ffffff',
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#ffa726',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f3e9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00A36C',
    marginBottom: 20,
  },
  graphContainer: {
    marginBottom: 20,
  },
  graphTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00A36C',
    marginBottom: 10,
  },
  graph: {
    borderRadius: 16,
  },
});

export default RgbGraphScreen;
