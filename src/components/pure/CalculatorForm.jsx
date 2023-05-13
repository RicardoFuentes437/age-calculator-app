import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import '../../styles/form/formStyles.css';

var currentTime = new Date();
var currentyYear = currentTime.getFullYear();

const borderStyle = {
    border: '2px solid hsl(0, 0%, 86%)'
};

const borderStyleError = {
    border: "1px solid hsl(0, 100%, 67%)"
};

const labelStyle = {
    color: 'hsl(0, 1%, 44%)',
};

const labelStyleError = {
    color: 'hsl(0, 100%, 67%)'
}

const FormSchema = Yup.object().shape({
    day: Yup.number()
        .min(1, 'Must be a valid day')
        .max(31, 'Must be a valid day')
        .required('This field is required!')
        .typeError('Must be a number!'),
    month: Yup.number()
        .min(1, 'Must be a valid month')
        .max(12, 'Must be a valid month')
        .required('This field is required!')
        .typeError('Must be a number!'),
    year: Yup.number()
        .max(currentyYear, 'Must be in the past')
        .required('This field is required!')
        .typeError('Must be a number!')
});

const CalculatorForm = ({calculate}) => {
    const [validDate, setValidDate] = useState(true);

    const initialValues = {
        day: 'DD',
        month: 'MM',
        year: 'YYYY'
    }

    const isDateValid = (day, month, year) => {
        // Create a list of days of a month      
        let ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (month === 1 || month > 2) {
            if (day > ListofDays[month - 1]) {
                //to check if the date is out of range     
                return false;
            }
        } else if (month === 2) {
            let leapYear = false;
            if ((!(year % 4) && year % 100) || !(year % 400)) leapYear = true;
            if ((leapYear === false) && (day >= 29)) return false;
            else
                if ((leapYear === true) && (day > 29)) {
                    return false;
                }
        }
        return true;
    }

    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={FormSchema}
                onSubmit={async (values) => {
                    await new Promise((r) => setTimeout(r, 1000));
                    if(isDateValid(values.day, values.month, values.year)){
                        setValidDate(true);
                        calculate(values);
                    }else{
                        setValidDate(false);
                    }
                    
                }}
                >
                {({ values, errors, touched }) => (
                    <Form className='form'>
                    <div className='inputs'>
                        <div className="form-section">
                            <label htmlFor="day" style={ (errors.day && touched.day) || !validDate ? labelStyleError : labelStyle}>DAY</label>
                            <Field id="day" type="number" name="day" className="input" placeholder="DD" style={ (errors.day && touched.day) || !validDate ? borderStyleError : borderStyle}/>
                            { errors.day && touched.day &&
                                (
                                <ErrorMessage name="day" component='div' className="error-message"></ErrorMessage>
                                )
                            }
                        </div>
                        <div className="form-section">
                            <label htmlFor="month" style={ (errors.month && touched.month) || !validDate ? labelStyleError : labelStyle}>MONTH</label>
                            <Field id="month" type="number" name="month" className="input" placeholder="MM" style={ (errors.month && touched.month) || !validDate ? borderStyleError : borderStyle}/>
                            { errors.month && touched.month &&
                                (
                                <ErrorMessage name="month" component='div' className="error-message"></ErrorMessage>
                                )
                            }
                        </div>
                        <div className='form-section'>
                            <label htmlFor="year" style={ (errors.year && touched.year) || !validDate ? labelStyleError : labelStyle}>YEAR</label>
                            <Field id="year" type="number" name="year" className="input" placeholder="YYYY" style={ (errors.year && touched.year) || !validDate ? borderStyleError : borderStyle}/>
                            { errors.year && touched.year &&
                                (
                                <ErrorMessage name="year" component='div' className="error-message"></ErrorMessage>
                                )
                            }
                        </div>
                        <button type="submit" id='submit-button'><img src="icon-arrow.svg" alt="arrow" id="arrow"/></button>
                    </div>
                    <div id='info'>
                        { validDate ? <p></p> : <p id="warning-message">Must be a valid date</p>}
                        <hr className="underline"></hr>
                    </div>
                    </Form>
                )}
            </Formik>    
        </div>
    );
};


CalculatorForm.propTypes = {
    calculate: PropTypes.func.isRequired
};


export default CalculatorForm;
