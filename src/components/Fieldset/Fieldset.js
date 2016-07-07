import React, { Component, PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import styles from './Fieldset.css';

class Fieldset extends Component {
  static propTypes = {
    className: PropTypes.string,
    legend: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.children !== this.props.children ||
           nextProps.legend !== this.props.legend ||
           nextProps.className !== this.props.className;
  }

  render() {
    const className = classNames(styles.fieldset, this.props.className);

    return (
      <fieldset className={className}>
        <legend className={styles.legend}>
          <FormattedMessage id={this.props.legend} />
        </legend>
        {this.props.children}
      </fieldset>
    );
  }
}

export default Fieldset;
