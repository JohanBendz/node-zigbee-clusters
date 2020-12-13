'use strict';

const Cluster = require('../Cluster');
const { ZCLDataTypes } = require('../zclTypes');

const ATTRIBUTES = {
  onOff: { id: 0, type: ZCLDataTypes.bool },
  onTime: { id: 16385, type: ZCLDataTypes.uint16 },
  offWaitTime: { id: 16386, type: ZCLDataTypes.uint16 },
  powerOnCtrl: { id: 16387, type: ZCLDataTypes.enum8({
    off: 0, // OFF (0) - off after power loss
    on: 1, // ON (1) - on after power loss with configured level (bri), color temp, color (default)
    recover: 255, // RECOVER (255) - on after power loss with last state
    })
  },
};

const COMMANDS = {
  setOff: { id: 0 },
  setOn: { id: 1 },
  toggle: { id: 2 },
  offWithEffect: {
    id: 64,
    args: {
      effectIdentifier: ZCLDataTypes.uint8,
      effectVariant: ZCLDataTypes.uint16,
    },
  },
  onWithRecallGlobalScene: { id: 65 },
  onWithTimedOff: {
    id: 66,
    args: {
      onOffControl: ZCLDataTypes.uint8,
      onTime: ZCLDataTypes.uint16,
      offWaitTime: ZCLDataTypes.uint16,
    },
  },
};

class OnOffCluster extends Cluster {

  static get ID() {
    return 6;
  }

  static get NAME() {
    return 'onOff';
  }

  static get ATTRIBUTES() {
    return ATTRIBUTES;
  }

  static get COMMANDS() {
    return COMMANDS;
  }

}

Cluster.addCluster(OnOffCluster);

module.exports = OnOffCluster;
