import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native'
import { Caption, Text } from 'react-native-paper'

import { withTheme } from 'react-native-paper'
import { withNavigation } from 'react-navigation'
import { useTranslation } from 'react-i18next'

const Private = ({
  theme,
  navigation,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  return (
    <View style={styling.root}>
      <Text>{t('This account is private')} </Text>
      <Caption>{t('Follow this account to see their photos')}</Caption>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    padding: theme.spacing.base,
    marginVertical: theme.spacing.base,
    alignItems: 'center',
  },
  link: {
    color: theme.colors.primary,
    fontWeight: '500',
  },
})

Private.propTypes = {
  theme: PropTypes.any,
  navigation: PropTypes.any,
}

export default withNavigation(
  withTheme(Private)
)