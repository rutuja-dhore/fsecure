
1.clone the project 

2.Go to the clone directory and npm install

3.
3.1 Create a zip of GetContentLambda.js and node_modules with name GetContentLambda.zip
3.2 Create a zip of EditContentLambda.js and node_modules with name EditContentLambda.zip

4.Execute createS3Bucket_cloudFormation.json to create an s3 bucket poland.fsecure.rutuja.dhore

5.Manually Upload the zip files(GetContentLambda.zip,EditContentLambda.zip) and doc.json in the s3 bucket poland.fsecure.rutuja.dhore

6.Execute createLambdas_cloudFormation.json to create 2 Lambdas GetContentLambda,EditContentLambda.

7.
7.1 GO to AWS LambdaFunction console and Select GetContentLambda
7.2 Click Test in GetContentLambda with an Event input as {} and Click Test
You should be able to see the Lambda response as contents of file doc.json

8.
8.1 GO to AWS LambdaFunction console and Select EditContentLambda
8.2 Click Test in EditContentLambda with an Event input as 
{
 "key" : "Here put your JSON key", 
 "value" : "Here put your JSON value "
} 
where key can be any json key and value can be the value you need to set to the key.

For example :
If you want to edit the file content to set(body) = "Yes!!Definitely I want to Join" then pass the input as
{
 "key" : "body" , 
 "value" : "Yes!!Definitely I want to Join"
} 

and Click Test


8.3 You should be able to see the Lambda response as 
1. If successfully Lambda execution ==> File updated on s3 
2. If input null ==> "JSON key cannot be NULL"
3. If invalid input ==> "Invalid JSON key!"
4. If key passes is last_edit_time or created_time ==> "Cannot update this JSON feild!"

