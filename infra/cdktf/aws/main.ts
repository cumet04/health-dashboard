import {Construct} from 'constructs';
import {S3Backend, TerraformStack} from 'cdktf';
import {AwsProvider} from '@cdktf/provider-aws/lib/provider';

export class AwsStack extends TerraformStack {
  constructor(scope: Construct) {
    super(scope, 'aws');

    new AwsProvider(this, 'AWS', {region: 'ap-northeast-1'});

    new S3Backend(this, {
      bucket: process.env.TFSTATE_BUCKET_NAME!,
      key: 'terraform.tfstate',
    });
  }
}
