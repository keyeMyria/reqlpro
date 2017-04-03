import * as core from './core';
import { main } from './main.reducer';
import store from './store';


let ConfigService, Segment, electron, HS, _store;
// let remote;
require.context = function(){};
describe('main', () => {

  beforeEach(() => {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true
    });

    // Mock dependencies
    ConfigService = sinon.stub();
    mockery.registerMock('./services/config.service', ConfigService);
    ConfigService.readConfigFile = sinon.stub().returns(new Promise(function(){}));

    Segment = {
      identify: sinon.spy()
    };
    mockery.registerMock('./services/segment.service', Segment);

    // store = sinon.stub();
    // store.dispatch = sinon.stub();
    // mockery.registerMock('./store', store);

    mockery.registerMock('./components/Sidebar/Connections/selectedConnection.actions', sinon.stub());
    mockery.registerMock('./components/App/App', sinon.stub());

    mockery.registerMock("../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss", sinon.stub());
    mockery.registerMock("../node_modules/font-awesome/scss/font-awesome.scss", sinon.stub());
    mockery.registerMock("./styles/index.scss", sinon.stub());

    electron = sinon.stub();
    electron.ipcRenderer = {
      on: function(message, callback){
        this.callback = callback;
      },
      send: function(message){
        this.callback();
      }
    };
    mockery.registerMock('electron', electron);

  });


  describe('initApp', () => {

    beforeEach(function(){
      _store = sinon.stub();
      _store.dispatch = sinon.stub();
      mockery.registerMock('./store', _store);
    });

    it('should call ConfigService.readConfigFile', () => {
      require('./main');
      expect(ConfigService.readConfigFile.callCount).to.equal(1);
    });

    it('should call segment identify after ConfigService.readConfigFile resolves');

    it('should call HS.beacon.open if triggered');

  });

  describe('createInitialState', () => {
    beforeEach(function(){
      _store = sinon.stub();
      _store.dispatch = sinon.stub();
      mockery.registerMock('./store', _store);
    });
    it('should take the user config file and return initial app state object', () => {

      const { createInitialState } = require('./main');
      let fakeConfigFile, fakeState, actual;

      ////// test 1 no config file
      fakeConfigFile ={};
      fakeState = {
        connection: {},
        connections: [],
        main: {
          email: null
        }
      };
      actual = createInitialState(fakeConfigFile);
      expect(actual).to.eql(fakeState);

      ////// test 2 config with connections
      fakeConfigFile =  {
        email: 'cassie@codehangar.io',
        connections: [
          'connection1', 'connection2'
        ]
      };
      fakeState = {
        main: { email: 'cassie@codehangar.io' },
        connections: [
          'connection1', 'connection2'
        ],
        connection: {
          selected: 'connection1'
        }
      };
      actual = createInitialState(fakeConfigFile);
      expect(actual).to.eql(fakeState);

      ////// test 3 config without connections
      fakeConfigFile = {
        email: 'cassie@codehangar.io',
      };
      fakeState = {
        main: { email: 'cassie@codehangar.io' },
        connections: [],
        connection: {}
      };
      actual = createInitialState(fakeConfigFile);
      expect(actual).to.eql(fakeState);

    });
  });
  //
  describe('main.reducer', () => {
  //
    it('should call core.setEmail for dispatch type SET_EMAIL', () => {
  //     core.setEmail = sinon.spy();
  //     console.log(store.getState());
  //     store.dispatch({
  //       type: 'SET_EMAIL',
  //       email: 'cassie@codehangar.io',
  //       created: '1/1/17'
  //     });
  //     expect(core.setEmail.callCount).to.equal(1);
    });
  });


});
