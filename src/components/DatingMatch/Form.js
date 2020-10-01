import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import TextField from 'components/Formik/TextField'
import PickerField from 'components/Formik/PickerField'
import DefaultButton from 'components/Formik/Button/DefaultButton'
import CollapsableComponent from 'templates/Collapsable'
import { Formik, Field } from 'formik'
import { withTranslation } from 'react-i18next'
import * as Yup from 'yup'

const formSchema = Yup.object().shape({
  matchAgeRangeMin: Yup.number().required('pick min age'),
  matchAgeRangeMax: Yup.number().required('pick max age'),
  matchGenders: Yup.string().required('pick gender'),
  matchLocationRadius: Yup.number().required('pick location'),
})

const DatingMatchForm = ({
  t,
  handleSubmit,
  loading,
  values,
  setFieldValue,
}) => {
  const styling = styles
  
  /**
   * [matchAgeRange] Generate age range starting from 18
   */
  const minAgeItems = useMemo(() => {
    const length = 68
    return Array.from({ length }, (_, i) => ({ label: `${i + 18}`, value: i + 18 }))
  }, [])

  /**
   * [matchAgeRange] Generate age range which is greater than matchAgeRangeMin
   */
  const maxAgeItems = useMemo(() => {
    const length = 68 + 18 - values.matchAgeRangeMin
    setFieldValue('matchAgeRangeMax', values.matchAgeRangeMin)
    return Array.from({ length }, (_, i) => ({ label: `${i + values.matchAgeRangeMin}`, value: i + values.matchAgeRangeMin }))
  }, [values.matchAgeRangeMin])

  /**
   * [matchGenders] Match genders
   */
  const genderItems = [
    { label: 'Male', value: 'MALE' },
    { label: 'Female', value: 'FEMALE' },
  ]

  /**
   * [matchLocationRadius] Match radius
   */
  const locationItems = [
    { label: '5 km', value: 5 },
    { label: '10 km', value: 10 },
    { label: '30 km', value: 30 },
    { label: '50 km', value: 50 },
    { label: '100 km', value: 100 },
  ]

  return (
    <View style={styling.root}>
      <CollapsableComponent
        style={styling.input}
        title="Match Age"
        helper="Change match age range"
        active={true}
        success={values.matchAgeRangeMin && values.matchAgeRangeMax}
      >
        <View style={styling.row}>
          <View style={styling.item}>
            <Field name="matchAgeRangeMin" component={PickerField} placeholder={{ label: 'Match Minimum Age', value: undefined }} items={minAgeItems}  />
          </View>
          <View style={styling.item}>
            <Field name="matchAgeRangeMax" component={PickerField} placeholder={{ label: 'Match Maximum Age', value: undefined }} items={maxAgeItems}  />
          </View>
        </View>
      </CollapsableComponent>

      <CollapsableComponent
        style={styling.input}
        title="Match Gender"
        helper="Change match gender"
        active={false}
        success={values.matchGenders}
      >
        <Field name="matchGenders" component={PickerField} placeholder={{ label: 'Match Gender', value: undefined }} items={genderItems} />
      </CollapsableComponent>
      <CollapsableComponent
        style={styling.input}
        title="Match Location Range"
        helper="Change match location range"
        active={false}
        success={values.matchLocationRadius}
      >
        <Field name="matchLocationRadius" component={PickerField} placeholder={{ label: 'Match Location Range', value: undefined }} items={locationItems} />
      </CollapsableComponent>
      <CollapsableComponent
        style={styling.input}
        title="Match Location"
        helper="Change match location"
        active={false}
        success={values.location}
      >
        <Field name="location" component={TextField} placeholder={t('Match Location')} />
      </CollapsableComponent>
      <View style={styling.input}>
        <DefaultButton label={t('Next')} onPress={handleSubmit} loading={loading} disabled={loading} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
  },
  input: {
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: -12,
  },
  item: {
    flex: 1,
    marginHorizontal: 12,
  },
})

DatingMatchForm.propTypes = {
  t: PropTypes.any,
  handleSubmit: PropTypes.any,
  loading: PropTypes.any,
  values: PropTypes.any,
  setFieldValue: PropTypes.any,
}

export default withTranslation()(({
  form,
  ...props
}) => (
  <Formik
    initialValues={form.formInitialValues}
    validationSchema={formSchema}
    onSubmit={form.handleFormSubmit}
    enableReinitialize
  >
    {(formikProps) => (
      <DatingMatchForm
        {...formikProps}
        {...props}
        {...form}
        loading={form.formSubmitLoading}
        disabled={form.formSubmitDisabled}
      />
    )}
  </Formik>
))
