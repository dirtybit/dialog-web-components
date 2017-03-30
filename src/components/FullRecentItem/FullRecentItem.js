/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Peer, PeerInfo, Message } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import { Text } from '@dlghq/react-l10n';
import classNames from 'classnames';
import PeerAvatar from '../PeerAvatar/PeerAvatar';
import DoublePeerAvatar from '../DoublePeerAvatar/DoublePeerAvatar';
import Icon from '../Icon/Icon';
import styles from './FullRecentItem.css';

export type Props = {
  className?: string,
  uid: number,
  info: PeerInfo,
  active: boolean,
  counter: number,
  message: ?Message,
  online: ?boolean,
  onSelect: (peer: Peer) => any
};

class FullRecentItem extends PureComponent {
  props: Props;

  handleClick = (): void => {
    this.props.onSelect(this.props.info.peer);
  };

  getFirstWord = (string: string): string => {
    return string.split(' ')[0];
  };

  renderAvatar(): React.Element<any> {
    const { info, message, online } = this.props;

    if (message && message.sender && info.type === 'group') {
      return (
        <DoublePeerAvatar
          className={styles.doubleAvatar}
          size={40}
          peerBig={info}
          peerSmall={message.sender}
        />
      );
    }

    return (
      <PeerAvatar
        className={styles.avatar}
        size={37}
        peer={info}
        online={online}
      />
    );
  }

  renderStatusSender() {
    const { uid, info, message } = this.props;
    if (message && message.sender) {
      if (uid === message.sender.peer.id) {
        return (
          <Text className={styles.sender} id="FullRecentItem.you" />
        );
      }

      if (info.type === 'group') {
        if (message.sender.title) {
          const title = this.getFirstWord(message.sender.title);

          return (
            <span className={styles.sender}>
              {title + ': '}
            </span>
          );
        }
      }
    }

    return null;
  }

  renderStatus() {
    const { message } = this.props;
    if (!message) {
      return null;
    }

    const { content } = message;

    switch (content.type) {
      case 'text':
        return (
          <div className={styles.message}>
            {this.renderStatusSender()}
            {content.text}
          </div>
        );

      case 'service':
        return (
          <div className={styles.message}>
            <span className={styles.service}>
              {content.text}
            </span>
          </div>
        );

      default:
        return (
          <div className={styles.message}>
            {this.renderStatusSender()}
            <Text
              className={styles.highlight}
              id={`FullRecentItem.${content.type}`}
            />
          </div>
        );
    }
  }

  renderCounter() {
    const { counter } = this.props;

    if (counter === 0) {
      return null;
    }

    return (
      <div className={styles.counter}>
        {counter}
      </div>
    );
  }

  renderIcon(): ?React.Element<any> {
    switch (this.props.info.type) {
      case 'group':
        return (
          <Icon glyph="group" className={styles.icon} size={22} />
        );

      case 'channel':
        return (
          <Icon glyph="channel" className={styles.icon} size={22} />
        );

      default:
        return null;
    }
  }

  render() {
    const { info, message, active, counter } = this.props;
    const className = classNames(styles.container, this.props.className, {
      [styles.active]: active,
      [styles.unread]: counter !== 0,
      [styles.withDoubleAvatar]: message && message.sender && info.type === 'group'
    });

    return (
      <div className={className} onClick={this.handleClick}>
        {this.renderAvatar()}
        <div className={styles.text}>
          <div className={styles.title}>
            {this.renderIcon()}
            <span>{info.title}</span>
          </div>
          {this.renderStatus()}
        </div>
        {this.renderCounter()}
      </div>
    );
  }
}

export default FullRecentItem;
