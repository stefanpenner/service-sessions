import Ember from 'ember';
import { test, moduleForModel } from 'ember-qunit';
import stateFor from 'ember-state-services/state-for';

let registry  = new Ember.Registry();
let container = new Ember.Container(registry);
let mockStatePOJO = { sample: 'example' };
const registryOpts = { singleton: true, instantiate: false };

moduleForModel('user', {
  // needs: []
  beforeEach() {
    this.registry.register('state:test-state-pojo', mockStatePOJO, registryOpts);
  }
});

test('that the key value can be an EmberData model', function(assert) {
  var modelA = this.subject({
    name: 'Bobby'
  });
  var modelB = this.subject({
    name: 'Lisa'
  });
  let mockObject = Ember.Object.extend({
    data: stateFor('test-state-pojo', 'model')
  }).create({
    container: this.container,
    model: modelA
  });

  assert.expect(3);
  assert.equal(mockObject.get('data.sample'), 'example');
  mockObject.set('data.sample', 'foo-bar');
  mockObject.set('model', modelB);
  assert.equal(mockObject.get('data.sample'), 'example');
  mockObject.set('model', modelA);
  assert.equal(mockObject.get('data.sample'), 'foo-bar');
});
