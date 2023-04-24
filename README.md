# aliyun-ddns

阿里云域名ddns解析【docker/widows/mac/linux】

## 如何使用

### docker

```bash
docker run -i \
    -e "domainName=你的域名" \
    -e "RR=你的域名前缀【默认nas】" \
    -e "type=你的域名解析类型【默认A】" \
    -e "accessKeyId=阿里云令牌" \
    -e "accessKeySecret=阿里云令牌" \
    -e "dingAccessToken=钉钉群机器人令牌【不填则不通知】" \
    -e "dingSecret=钉钉群机器人签名【不填则不通知】" \
    sunxiao0721/aliyun-ddns
```

### macos/windows/linux

#### 下载代码

```bash
git clone git@github.com:TNT-Likely/aliyun-ddns.git
```

#### 编辑配置

config 目录下拷贝config.js，命名为config.tmp.js,修改其中的配置

#### 安装&运行

```bash
npm i
npm start
```
