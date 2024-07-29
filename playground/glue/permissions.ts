import {type Permission} from '../types';

// TODO:: Translate
export enum PermissionId {
  CAN_CREATE_USER = 'CAN_CREATE_USER',
  CAN_INVITE_USER = 'CAN_INVITE_USER',
  CAN_READ_USER = 'CAN_READ_USER',
  CAN_UPDATE_USER = 'CAN_UPDATE_USER',
  CAN_DELETE_USER = 'CAN_DELETE_USER',
  CAN_BAN_USER = 'CAN_BAN_USER',
  CAN_UNBAN_USER = 'CAN_UNBAN_USER',
}

export const permissions: Permission[] = [
  {
    id: PermissionId.CAN_CREATE_USER,
    name: 'Kann Benutzer erstellen'
  },
  {
    id: PermissionId.CAN_INVITE_USER,
    name: 'Kann neuen Benutzer einladen'
  },
  {
    id: PermissionId.CAN_READ_USER,
    name: 'Kann Benutzer lesen'
  },
  {
    id: PermissionId.CAN_UPDATE_USER,
    name: 'Kann Benutzer bearbeiten'
  },
  {
    id: PermissionId.CAN_DELETE_USER,
    name: 'Kann Benutzer löschen'
  },
  {
    id: PermissionId.CAN_BAN_USER,
    name: 'Kann Benutzer sperren'
  },
  {
    id: PermissionId.CAN_UNBAN_USER,
    name: 'Kann Sperre aufheben'
  }
];
