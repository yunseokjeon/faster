# Faster

영어 독해 속도 측정기 입니다.

<img alt="main image" src="doc/images/main.png">

```bash
# Mac의 경우 처음 빌드하려고 하면, 권한 문제가 발생.
$ sudo chown -R 501:20 "/Users/yun/.npm" # 권한 설정. 사용자 정보에 따라 변화.
$ rm -rf node_modules
$ npm cache clean --force

# 권한 문제가 없다면, 아래의 명령어만으로 빌드 가능.
$ npm install
$ npm run start
```