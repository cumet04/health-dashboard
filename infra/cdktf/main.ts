import {App} from 'cdktf';
import {AwsStack} from './aws/main';

const app = new App();
new AwsStack(app);
app.synth();
