import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  useColorScheme,
  Alert,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {PencilSimple, TrashSimple} from 'phosphor-react-native';
import {ThemeToggle} from './components/ThemeToggle';
import {ExpenseInput} from './components/ExpenseInput';

const App = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const systemTheme = useColorScheme();
  const [theme, setTheme] = useState(systemTheme);
  const [date, setDate] = useState(new Date());
  const [expName, setExpName] = useState('');
  const [expCost, setExpCost] = useState('');
  const [data, setData] = useState([]);
  const [totalExpenditure, setTotalExpenditure] = useState(0);
  const [open, setOpen] = useState(false);
  const [mainButton, setMainButton] = useState('ADD EXPENSE');
  const [editingItemId, setEditingItemId] = useState(null);
  const styles = getStyles(theme);

  const handleAddOrUpdateItem = () => {
    if (mainButton === 'ADD EXPENSE') {
      const newId = data.length + 1; // Using the length of data to determine the next ID
      const newItem = {
        id: newId,
        title: expName,
        cost: expCost,
        date: date.toISOString().split('T')[0],
      };
      setData([...data, newItem]);
    } else {
      const updatedData = data.map(item =>
        item.id === editingItemId
          ? {
              ...item,
              title: expName,
              cost: expCost,
              date: date.toISOString().split('T')[0],
            }
          : item,
      );
      setData(updatedData);
      setMainButton('ADD EXPENSE');
    }
    resetForm();
  };

  const editItem = id => {
    const item = data.find(item => item.id === id);
    setExpName(item.title);
    setExpCost(item.cost);
    setDate(new Date(item.date));
    setEditingItemId(id);
    setMainButton('UPDATE');
  };

  const confirmDelete = id => {
    Alert.alert(
      'Delete Expense',
      'Are you sure you want to delete this expense?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'OK', onPress: () => deleteItem(id)},
      ],
      {cancelable: false},
    );
  };

  const deleteItem = id => {
    const filteredData = data.filter(item => item.id !== id);
    const updatedData = filteredData.map((item, index) => ({
      ...item,
      id: index + 1, // Reassign IDs sequentially
    }));
    setData(updatedData);
  };

  const resetForm = () => {
    setExpName('');
    setExpCost('');
    setDate(new Date());
    setEditingItemId(null);
    setMainButton('ADD EXPENSE');
  };

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    setTheme(currentTheme => (currentTheme === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    const total = data.reduce((acc, curr) => {
      const costValue = parseFloat(curr.cost.replace(/^\$/, ''));
      return acc + (isNaN(costValue) ? 0 : costValue);
    }, 0);
    setTotalExpenditure(total);
  }, [data]); // This effect runs whenever 'data' changes

  return (
    <View style={styles.container}>
      <Text style={[styles.h1, styles.text]}>Expense Log</Text>

      <ThemeToggle
        isEnabled={isEnabled}
        toggleSwitch={toggleSwitch}
        styles={styles}
      />

      <TouchableOpacity style={styles.button} onPress={() => setOpen(true)}>
        <Text style={styles.text}>Select Date</Text>
      </TouchableOpacity>

      <DatePicker
        modal
        open={open}
        date={date}
        mode={'date'}
        theme={theme}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />

      <ExpenseInput
        expName={expName}
        setExpName={setExpName}
        expCost={expCost}
        setExpCost={setExpCost}
        theme={theme}
        styles={styles}
      />

      <View style={styles.flexRow}>
        <TouchableOpacity
          style={[styles.button, styles.mainButton]}
          onPress={() => handleAddOrUpdateItem()}>
          <Text style={styles.text}>{mainButton}</Text>
        </TouchableOpacity>

        {editingItemId !== null && (
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={resetForm}>
            <Text style={styles.text}>CANCEL</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={[styles.flexRow, styles.SpaceBetween]}>
        <Text style={[styles.h4, styles.text]}>Total Expenditure: </Text>
        <Text style={[styles.h4, styles.text]}>${totalExpenditure}</Text>
      </View>

      <FlatList
        contentContainerStyle={styles.listWrapper}
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <>
            <View style={[styles.flexRow, styles.itemContainer]}>
              <View style={[styles.flexRow, styles.SpaceBetween]}>
                <Text style={styles.text}>{item.id}</Text>
                <Text style={styles.divider}>|</Text>
                <Text style={styles.text}>{item.title}</Text>
                <Text style={styles.divider}>|</Text>
                <Text style={styles.text}>$ {item.cost}</Text>
              </View>

              {/*<Text style={styles.text}>*/}
              {/*  {item.id} | {item.title} | ${item.cost}*/}
              {/*</Text>*/}

              <View style={styles.itemButtonGroup}>
                <TouchableOpacity
                  style={styles.iconWrapper}
                  onPress={() => editItem(item.id)}>
                  <PencilSimple weight={'fill'} size={18} color="#777" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => confirmDelete(item.id)}>
                  <TrashSimple weight={'fill'} size={18} color="red" />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.dateCaption}>{item.date}</Text>
          </>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const getStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      // justifyContent: 'center',
      backgroundColor: theme === 'dark' ? '#1f1f1f' : '#DEE4E7',
      // paddingBottom: 10,
    },
    text: {
      color: theme === 'dark' ? '#FFFFFF' : '#000000', // Dark: white, Light: black
    },
    h1: {
      fontSize: 24,
      margin: 20,
      fontWeight: '800',
    },
    h4: {
      fontWeight: '600',
    },
    flexRow: {
      marginVertical: 8,
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    SpaceBetween: {
      width: '75%',
      justifyContent: 'space-between',
    },
    inputWide: {
      // backgroundColor: '#121212',
      backgroundColor: theme === 'dark' ? '#121212' : '#f5f5f5',
      color: theme === 'dark' ? '#fff' : '#121212',
      paddingHorizontal: 16,
      borderRadius: 10,
      width: '60%',
      marginRight: 8,
    },
    inputShort: {
      backgroundColor: theme === 'dark' ? '#121212' : '#f5f5f5',
      color: theme === 'dark' ? '#fff' : '#121212',
      paddingHorizontal: 16,
      borderRadius: 10,
      width: '20%',
      textAlign: 'center',
    },
    button: {
      backgroundColor: theme === 'dark' ? '#000' : '#fff',
      // backgroundColor: '#000',
      width: '80%',
      height: 50,
      borderRadius: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    listWrapper: {
      flexGrow: 1,
      backgroundColor: theme === 'dark' ? '#121212' : '#f5f5f5',
      padding: 16,
      width: 320,
      borderRadius: 10,
      alignItems: 'center',
    },
    dateCaption: {
      fontSize: 10,
      textAlign: 'right',
      // color: theme === 'dark' ? '#fff' : '#121212',
      color: '#626262',
    },
    itemButtonGroup: {
      display: 'flex',
      flexDirection: 'row',
      paddingTop: 9,
      paddingHorizontal: 10,
      marginLeft: 10,
    },
    iconWrapper: {
      marginRight: 8,
    },
    mainButton: {
      width: '60%',
    },
    cancelButton: {
      backgroundColor: '#b22222', // Red color for the cancel button
      width: '20%',
      marginLeft: 10,
    },
    itemContainer: {
      width: '90%',
    },
    divider: {
      color: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', // Dark: white, Light: black
    },
  });

export default App;
