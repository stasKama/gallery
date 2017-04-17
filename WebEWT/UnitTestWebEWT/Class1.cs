using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Interactions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace UnitTestWebEWT
{
    [TestFixture]
    public class TestCase
    {
        private string baseUrl = "http://localhost:54841/";

        public ChromeDriver getDriver() {
            var driver  = new ChromeDriver();
            driver.Manage().Window.Maximize();
            driver.Navigate().GoToUrl(baseUrl);
            return driver;
        }

        [Test]
        public void testLinkMenu()
        {
            var driver = getDriver();
            driver.FindElement(By.Id("goToGallery")).Click();
            Assert.AreEqual(driver.Url, baseUrl + "Image/Gallery");
            driver.FindElement(By.Id("goToHome")).Click();
            Assert.AreEqual(driver.Url, baseUrl + "Home/Index");
            driver.FindElement(By.Id("goToUpload")).Click();
            Assert.AreEqual(driver.Url, baseUrl + "Image/UploadImage");
            driver.Quit();
        }

        [Test]
        public void testDeletemage()
        {
            var driver = getDriver();
            driver.FindElement(By.Id("goToGallery")).Click();
            for (int i = 0; i < 2; i++)
            {
                var images = driver.FindElements(By.ClassName("cell"));
                Random random = new Random(DateTime.Now.Millisecond);
                var countImages = images.Count;
                images.ElementAt(random.Next(0, countImages - 1)).Click();
                driver.FindElement(By.Id("bt-delete")).Click();
                if (i % 2 == 0)
                {
                    driver.FindElement(By.Id("bt-yes")).Click();
                    driver.Navigate().Refresh();
                    Assert.AreEqual(driver.FindElements(By.ClassName("cell")).Count, countImages - 1);
                } else
                {
                    driver.FindElement(By.Id("bt-no")).Click();
                    driver.Navigate().Refresh();
                    Assert.AreEqual(driver.FindElements(By.ClassName("cell")).Count, countImages);
                }
            }
            driver.Quit();
        }

        [Test]
        public void testGallery()
        {
            var driver = getDriver();
            driver.FindElement(By.Id("goToGallery")).Click();
            var images = driver.FindElements(By.ClassName("cell"));
            foreach(var img in images)
            {
                img.Click();
                driver.FindElement(By.Id("one-img")).Click();
            }
            var checkboxes = driver.FindElements(By.CssSelector("input[type = 'checkbox']"));
            foreach (var chb in checkboxes)
            {
                if (chb.Selected)
                {
                    chb.Click();
                }
            }

            int count = 0;
            foreach (var img in images)
            {
                count += img.Displayed ? 1 : 0;
            }

            Assert.AreEqual(count, 0);

            var checkbox1 = checkboxes.ElementAt(0);
            checkbox1.Click();
            count = 0;
            int countCheckImage = 0;
            var expansionImage = checkbox1.GetAttribute("value");
            foreach (var img in images)
            {
                count += img.Displayed ? 1 : 0;
                var expansion = img.GetAttribute("src").Substring(img.GetAttribute("src").LastIndexOf(".") + 1);
                expansion = expansion == "jpg" || expansion == "png" ? expansion : "other";
                countCheckImage += expansion == expansionImage ? 1 : 0;
            }
            Assert.AreEqual(count, countCheckImage);
            driver.Quit();
        }

        [Test]
        public void testUploadImage()
        {
            var driver = getDriver();
            
            driver.FindElement(By.Id("goToUpload")).Click();
            driver.FindElement(By.Id("file")).SendKeys("C:/Users/Lenovo/Pictures/test.jpg");
            Assert.AreEqual(driver.FindElement(By.Id("message")).Text, "Image with this name is not in the collection!");
            Assert.AreEqual(driver.FindElement(By.Id("fileName")).GetAttribute("value"), "test");
            driver.FindElement(By.Id("submit")).Click();

            Assert.AreEqual(driver.Url, baseUrl + "Image/UploadImage");
            Assert.AreEqual(driver.FindElement(By.Id("message")).Text, "Image upload in server!");

            driver.FindElement(By.Id("file")).SendKeys("C:/Users/Lenovo/Pictures/test.jpg");
            Assert.AreEqual(driver.FindElement(By.Id("message")).Text, "Image with this name exists!");

            var fieldNameImage = driver.FindElement(By.Id("fileName"));
            fieldNameImage.SendKeys(Keys.Backspace);
            fieldNameImage.SendKeys(Keys.Backspace);
            fieldNameImage.SendKeys(Keys.Backspace);
            fieldNameImage.SendKeys(Keys.Backspace);
            Assert.AreEqual(driver.FindElement(By.Id("message")).Text, "Enter name in field \"Name Image\"");
            fieldNameImage.SendKeys("NewNameImage");
            Assert.AreEqual(driver.FindElement(By.Id("message")).Text, "Image with this name is not in the collection!");
            driver.FindElement(By.Id("submit")).Click();
            Assert.AreEqual(driver.FindElement(By.Id("message")).Text, "Image upload in server!");
            driver.Quit();
        }
     
        [Test]
        public void testSpoiler()
        {
            var driver = getDriver();
            foreach (var art in driver.FindElements(By.ClassName("block-hero")))
            {
                Assert.AreEqual(art.Displayed, false);
            }
            var spoilers = driver.FindElements(By.TagName("h2"));
            Assert.AreEqual(spoilers.Count, 8);
            spoilers.ElementAt(1).Click();
            Thread.Sleep(500);
            spoilers.ElementAt(0).Click();
            Thread.Sleep(500);
            spoilers.ElementAt(2).Click();
            Thread.Sleep(500);
            spoilers.ElementAt(5).Click();
            Thread.Sleep(500);
            spoilers.ElementAt(7).Click();
            Thread.Sleep(500);
            spoilers.ElementAt(3).Click();
            Thread.Sleep(500);
            spoilers.ElementAt(6).Click();
            Thread.Sleep(500);
            spoilers.ElementAt(4).Click();
            foreach (var art in driver.FindElements(By.ClassName("block-hero")))
            {
                Assert.AreEqual(art.Displayed, true);
            }
            driver.Quit();
        }
    }
}