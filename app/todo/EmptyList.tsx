import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Icon, Text } from 'react-native-paper'

const EmptyList = () => {
  return (
    <View style={styles.container}>
    <Icon source="information-outline" size={80} />
    <Text variant="bodyMedium" style={{fontStyle:"italic"}}>
      Você não tem tarefas ainda.
    </Text>
  </View>
  )
}

export default EmptyList

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: '50%',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });