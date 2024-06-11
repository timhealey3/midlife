import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';

interface Job {
  name: string;
  pay: number;
}

interface AllJobs {
  blacksmith: Boolean;  // Dwarve
  bowmaker: Boolean;    // elf
  innkeeper: Boolean;   // hobbit
  farmer: Boolean;      // human
  miner: Boolean;       // Dwarve
}

interface Parents {
  motherAge: number;
  fatherAge: number;
  money: number;
  job: Job;
}

interface Person {
  age: number;
  city: string;
  job: Job;
  money: number;
  name: string;
  parents: Parents;
  possibleJobs: AllJobs;
  race: String;
  royalty: Boolean;
  year: number;
}

const initParents = (): Parents => {
  return {
    motherAge: 30,
    fatherAge: 32,
    money: 200,
    job: parentJob(),
  };
};

const parentJob = (): Job => {
  return {
    name: 'Random Job',
    pay: 5,
  };
};

const initJob = (): AllJobs => {
  return {
    blacksmith: false,
    bowmaker: false,
    innkeeper: false,
    farmer: false,
    miner: false,
  };
};

const initPleb = (): AllJobs => {
  return {
    blacksmith: true,
    bowmaker: true,
    innkeeper: false,
    farmer: true,
    farmer: true,
    miner: true,
  };
};

const generateJob = (): Job => {
  return {
    name: 'None',
    pay: 0,
  };
};

const GeneratePerson = (): Person => {
  return {
    age: 0,
    city: 'Hobbiton',
    job: generateJob(),
    money: 0,
    name: 'Frodo Baggins',
    parents: initParents(),
    possibleJobs: initJob(),
    race: 'Dwarve',
    royalty: false,
    year: Math.floor(Math.random() * 300 + 27),
  };
};

function App(): React.JSX.Element {
  const [person, setPerson] = React.useState<Person | null>(null);

  const handleGeneratePerson = () => {
    const newPerson = GeneratePerson();
    setPerson(newPerson);
  };

  const helpOutParent = () => {
    // TODO make it a choice
    person.job.name = 'Helping';
    person.job.pay = 2;
  };

  const increaseAge = () => {
    setPerson({
      ...person,
      age: person.age + 1,
      year: person?.year + 1,
      money: person?.money + person.job.pay,
      parents.money: person?.parents.job.pay + person?.money,
    });
    jobAge();
  };

  const jobAge = () => {
    const probability = Math.floor(Math.random() * 101);
    // help your dad out 8 - 17
    if (person.age < 17 && person.age > 8 && person?.royalty == false) {
      if (probability < 5 && person.job.name === 'None') {
        helpOutParent();
      }
    }
    // at age 18 make them able to get full time plebian jobs
    if (person.age === 18) {
      initPleb();
    }
    // if rome is at war have this pop up
    if (person.age >= 100) {
      signUpSoldier();
    }
    // 17 <= jobs
    // farmer, merchant, soldier, gladiator, engineer, builder, fisherman, pottery
    // accountant, tax collector, senator, government official
  };

  const signUpSoldier = () => {
    console.log('Signed Up');
    //setPerson({ ...person, possibleJobs.soldier: true});
    //person?.possibleJobs.soldier = true;
  };

  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView>
        <View>
          <Button title="Generate Person" onPress={handleGeneratePerson} />
          {person && (
            <View>
              <Text>Name: {person.name}</Text>
              <Text>Age: {person.age}</Text>
              <Text>
                Job: {person.job.name} Pay: {person.job.pay}
              </Text>
              <Text>Bank: {person.money}</Text>
              <Text>Dad age: {person.parents.fatherAge}</Text>
              <Text>Mom age: {person.parents.motherAge}</Text>
              <Text>Parent Money: {person.parents.money}</Text>
              <Text>City: {person.city}</Text>
              <Text>Year: {person.year}</Text>
            </View>
          )}
          <Button title="Age" onPress={increaseAge} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
