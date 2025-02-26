import React, {Dispatch, SetStateAction} from 'react';

interface OverlayInfo {
  key: string;
  Component: React.FC<any>;
  props: unknown;
  resolve: (value: any) => void;
  reject: (reason: any) => void;
}
type FlagState = [number, Dispatch<SetStateAction<number>>]

export default class OverlayController {
  private flagState: FlagState;
  private overlayInfos: OverlayInfo[] = [];

  constructor(flagState: any) {
    this.flagState = flagState;
  }

  private flush() {
    const [, setFlag] = this.flagState;
    setFlag((prev) => prev + 1);
  }
  get top() {
    return this.overlayInfos[this.overlayInfos.length - 1];
  }
  private handlePromise(key: string, resolver: (value: unknown) => void, value: any) {
    resolver(value);
    this.overlayInfos = this.overlayInfos.filter(({ key: _key }) => key != _key);
    this.flush();
  }
  clear() {
    while (this.overlayInfos.length) this.pop();
    this.flush();
  }
  pop() {
    this.top.reject(`Close modal: ${this.top.key}`);
    this.overlayInfos.pop();
    this.flush();
  }
  async push(key: string, Component: React.FC<any>, props: unknown) {
    return await new Promise((resolve, reject) => {
      this.overlayInfos.push({
        key: key,
        Component: Component,
        props: props,
        resolve: (value) => this.handlePromise(key, resolve, value),
        reject: (reason) => this.handlePromise(key, reject, reason),
      });
      this.flush();
    });
  }
}
