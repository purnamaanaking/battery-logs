import React, { Component } from 'react';
import {
  NativeBaseProvider,
  ScrollView,
  Spinner,
  View,
  Button,
  Select,
  CheckIcon,
  Heading,
  Divider,
  Row,
  Icon,
  Input,
  IconButton,
  Text,
  Center,
  Pressable,
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import Chart from './components/Chart';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import moment from 'moment';

const Stack = createNativeStackNavigator();

class App extends Component {
  render() {
    return (
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ title: 'Battery Logs' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    );
  }
}

class Home extends Component {
  state = {
    dataX: null,
    dataY1: null,
    dataY2: null,
    dataY3: null,
    dataY4: null,
    dataY5: null,
    dataY6: null,
    dataY7: null,
    dataY8: null,
    dataY9: null,
    dataY10: null,
    dataYNames: null,
    isLoading: null,
    date: new Date(),
    dateForApi: moment(new Date()).format('YYYY-MM-DD'),
    // dateForApi: '2022-12-01',
    duration: '1h',
    mode: 'date',
    show: false,
  };

  getData = () => {
    this.setState({ isLoading: true });

    const { dateForApi, duration } = this.state;
    const endPointApi = `https://interviewexercise.azurewebsites.net/api/v1/battery/1/logs/minutely?from=${dateForApi} 00:00:00&duration=${duration}`;

    return fetch(endPointApi)
      .then((response) => response.json())
      .then((json) =>
        this.setState({
          dataX: json.data.x,
          dataY1: json.data.y[0],
          dataY2: json.data.y[1],
          dataY3: json.data.y[2],
          dataY4: json.data.y[3],
          dataY5: json.data.y[4],
          dataY6: json.data.y[5],
          dataY7: json.data.y[6],
          dataY8: json.data.y[7],
          dataY9: json.data.y[8],
          dataY10: json.data.y[9],
          dataYNames: json.data.y_names,
        })
      )
      .catch((error) => console.error(error))
      .finally(() => this.setState({ isLoading: false }));
  };

  onChangePicker = (selectedDate) => {
    const currentDate = new Date(selectedDate.nativeEvent.timestamp);
    this.setState({
      show: false,
      date: currentDate,
      dateForApi: moment(currentDate).format('YYYY-MM-DD'),
    });
  };

  showMode = (currentMode) => {
    this.setState({ show: true, mode: currentMode });
  };

  showDatepicker = () => {
    this.showMode('date');
  };

  render() {
    const {
      isLoading,
      dataX,
      dataY1,
      dataY2,
      dataY3,
      dataY4,
      dataY5,
      dataY6,
      dataY7,
      dataY8,
      dataY9,
      dataY10,
      duration,
      date,
      show,
      mode,
      dateForApi,
    } = this.state;

    return (
      <NativeBaseProvider>
        <ScrollView>
          <View p="15px">
            <View mb="15px" bg="white" p="15px">
              <Text fontWeight="bold">From</Text>
              <Row space={5} mb="15px">
                <View flex={6}>
                  <Pressable onPress={this.showDatepicker}>
                    <Input
                      size="lg"
                      isReadOnly
                      value={dateForApi}
                      placeholder="From"
                    />
                  </Pressable>
                </View>
                <View flex={1}>
                  <IconButton
                    flex={1}
                    borderRadius="sm"
                    variant="solid"
                    icon={
                      <Icon
                        as={Ionicons}
                        name="calendar"
                        size="lg"
                        color="warmGray.50"
                      />
                    }
                    onPress={this.showDatepicker}
                  />
                  {show && (
                    <DateTimePicker
                      value={date}
                      mode={mode}
                      is24Hour={true}
                      onChange={this.onChangePicker}
                    />
                  )}
                </View>
              </Row>
              <View mb="15px">
                <Text fontWeight="bold">Duration</Text>
                <Select
                  selectedValue={duration}
                  minWidth="200"
                  accessibilityLabel="Choose Duration"
                  placeholder="Choose Duration"
                  _selectedItem={{
                    bg: 'light.200',
                    endIcon: <CheckIcon size="5" />,
                  }}
                  mt={1}
                  onValueChange={(itemValue) =>
                    this.setState({ duration: itemValue })
                  }>
                  <Select.Item label="1 hour" value="1h" />
                  <Select.Item label="2 hour" value="2h" />
                  <Select.Item label="3 hour" value="3h" />
                  <Select.Item label="4 hour" value="4h" />
                </Select>
              </View>
              <View>
                <Button onPress={this.getData}>Get Data</Button>
              </View>
            </View>
            <View>
              {isLoading != null ? (
                isLoading ? (
                  <Spinner size="lg" mt="30px" />
                ) : (
                  <View>
                    {dataX.length == 0 ? (
                      <Center>No Data</Center>
                    ) : (
                      <>
                        <Divider />

                        <View mt="30px">
                          <Heading>All</Heading>
                          <Divider mb="10px" />
                          <Chart
                            data={{
                              labels: dataX,
                              datasets: [
                                {
                                  data: dataY1,
                                  color: () => `rgba(0, 0, 0, 0.6)`,
                                },
                                {
                                  data: dataY2,
                                  color: () => `rgba(0, 0, 0, 0.6)`,
                                },
                                {
                                  data: dataY3,
                                  color: () => `rgba(0, 0, 0, 0.6)`,
                                },
                                {
                                  data: dataY4,
                                  color: () => `rgba(0, 0, 0, 0.6)`,
                                },
                                {
                                  data: dataY5,
                                  color: () => `rgba(0, 0, 0, 0.6)`,
                                },
                                {
                                  data: dataY6,
                                  color: () => `rgba(0, 0, 0, 0.6)`,
                                },
                                {
                                  data: dataY7,
                                  color: () => `rgba(0, 0, 0, 0.6)`,
                                },
                                {
                                  data: dataY8,
                                  color: () => `rgba(0, 0, 0, 0.6)`,
                                },
                                {
                                  data: dataY9,
                                  color: () => `rgba(0, 0, 0, 0.6)`,
                                },
                                {
                                  data: dataY10,
                                  color: () => `rgba(0, 0, 0, 0.6)`,
                                },
                              ],
                            }}
                          />
                        </View>

                        <View mt="30px">
                          <Heading>State of Charge</Heading>
                          <Divider mb="10px" />
                          <Chart
                            data={{
                              labels: dataX,
                              datasets: [
                                {
                                  data: dataY10,
                                  color: () => `rgba(0, 0, 0, 0.6)`,
                                },
                              ],
                            }}
                          />
                        </View>

                        <View mt="30px">
                          <Heading>Battery Current</Heading>
                          <Divider mb="10px" />
                          <Chart
                            data={{
                              labels: dataX,
                              datasets: [
                                {
                                  data: dataY1,
                                  color: () => `rgba(0, 0, 0, 0.6)`,
                                },
                                {
                                  data: dataY2,
                                  color: () => `rgba(0, 80, 225, 0.6)`,
                                },
                                {
                                  data: dataY3,
                                  color: () => `rgba(158, 7, 7, 0.6)`,
                                },
                              ],
                              legend: ['Average', 'Min', 'Max'],
                            }}
                          />
                        </View>

                        <View mt="30px">
                          <Heading>Battery Voltage</Heading>
                          <Divider mb="10px" />
                          <Chart
                            data={{
                              labels: dataX,
                              datasets: [
                                {
                                  data: dataY4,
                                  color: () => `rgba(0, 0, 0, 0.6)`,
                                },
                                {
                                  data: dataY5,
                                  color: () => `rgba(0, 80, 225, 0.6)`,
                                },
                                {
                                  data: dataY6,
                                  color: () => `rgba(158, 7, 7, 0.6)`,
                                },
                              ],
                              legend: ['Average', 'Min', 'Max'],
                            }}
                          />
                        </View>

                        <View mt="30px">
                          <Heading>Battery Temperature</Heading>
                          <Divider mb="10px" />
                          <Chart
                            data={{
                              labels: dataX,
                              datasets: [
                                {
                                  data: dataY7,
                                  color: () => `rgba(0, 0, 0, 0.6)`,
                                },
                                {
                                  data: dataY8,
                                  color: () => `rgba(0, 80, 225, 0.6)`,
                                },
                                {
                                  data: dataY9,
                                  color: () => `rgba(158, 7, 7, 0.6)`,
                                },
                              ],
                              legend: ['Average', 'Min', 'Max'],
                            }}
                          />
                        </View>
                      </>
                    )}
                  </View>
                )
              ) : (
                <View />
              )}
            </View>
          </View>
        </ScrollView>
      </NativeBaseProvider>
    );
  }
}

export default App;
