import freeze from 'deep-freeze-node';
import { setOrderByPredicate } from './core';

describe('setOrderByPredicate', () => {
  const state = {
    selectedTable: {}
  };

  it('should set sort field properly from simple string', () => {
    const nextState = setOrderByPredicate(freeze(state), "'name'");
    expect(nextState.selectedTable.query.sort).to.deep.equal('name');
  });

  it('should set sort field properly from "function call"', () => {
    const nextState = setOrderByPredicate(freeze(state), "r.desc('name')");
    expect(nextState.selectedTable.query.sort).to.deep.equal('name');
  });

});
