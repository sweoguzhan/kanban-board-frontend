import React from 'react';
import styles from './Spinner.module.css'; // CSS Module import

const Spinner: React.FC = () => {
    return (
        <div className={styles.spinner}></div>
    );
};

export default Spinner;
