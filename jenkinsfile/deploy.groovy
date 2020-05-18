#!groovy

@Library(value='pipeline-lib@master', changelog=false) _

deployPipeline projectName: 'hc-crypto-js', env: "$ENV"
